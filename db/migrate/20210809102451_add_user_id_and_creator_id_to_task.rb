# frozen_string_literal: true

class AddUserIdAndCreatorIdToTask < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :user_id, :int
    add_column :tasks, :creator_id, :int
  end
end

