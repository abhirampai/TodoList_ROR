# frozen_string_literal: true

class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze

  has_many :tasks, foreign_key: :user_id
  has_many :user_notifications, dependent: :destroy, foreign_key: :user_id
  has_one :preference, dependent: :destroy, foreign_key: :user_id
  has_many :comments, dependent: :destroy
  has_secure_password
  has_secure_token :authentication_token

  validates :email, presence: true,
                    uniqueness: true,
                    length: { maximum: 50 },
                    format: { with: VALID_EMAIL_REGEX }
  validates :password, presence: true, confirmation: true, length: { minimum: 6 }
  validates :password_confirmation, presence: true, on: :create
  validates :name, presence: true, length: { maximum: 50 }
  before_save :to_lowercase
  before_create :build_default_preference
  before_destroy :change_task_owner

  private

    def to_lowercase
      email.downcase!
    end

    def build_default_preference
      self.build_preference(notification_delivery_hour: Constants::DEFAULT_NOTIFICATION_DELIVERY_HOUR)
    end

    def change_task_owner
      tasks_to_change_owner = Task.where(
        "user_id = :user_id and creator_id <> :creator_id",
{ user_id: self.id, creator_id: self.id })
      tasks_to_change_owner.each do |task|
        task.user_id = task.creator_id
        task.save
      end
    end
end

