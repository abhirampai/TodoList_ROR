# frozen_string_literal: true

class Project < ApplicationRecord
  has_many :tasks, dependent: :destroy, foreign_key: :project_id
end

