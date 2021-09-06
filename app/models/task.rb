# frozen_string_literal: true

class Task < ApplicationRecord
  belongs_to :user
  belongs_to :project
  RESTRICTED_ATTRIBUTES = %i[title user_id]
  validates :title, presence: true, length: { maximum: 50 }
  has_many :comments, dependent: :destroy
  enum progress: { pending: 0, completed: 1 }
  enum status: { unstarred: 0, starred: 1 }
  validates :slug, uniqueness: true
  validate :slug_not_changed
  after_create :log_task_details
  before_create :set_slug
  after_commit :log_task_details, on: :create

  private

    def set_slug
      title_slug = title.parameterize
      latest_task_slug = Task.where(
        "slug REGEXP ?",
        "#{title_slug}$|#{title_slug}-[0-9]+$",
      ).order(slug: :desc).first&.slug
      slug_count = 0
      if latest_task_slug.present?
        slug_count = latest_task_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, t("task.slug.immutable"))
      end
    end

    def self.inorder_of(progress)
      starred = send(progress).starred.order("updated_at DESC")
      unstarred = send(progress).unstarred.order("updated_at DESC")
      starred + unstarred
    end

    def log_task_details
      TaskLoggerJob.perform_later(self)
    end
end

