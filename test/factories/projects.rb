# frozen_string_literal: true

FactoryBot.define do
  factory :project do
    project_name { Faker::Name.name }
  end
end

