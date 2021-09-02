# frozen_string_literal: true

class Addprojectidforeignkeytotask < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :project_id, :int
    add_foreign_key :tasks, :projects, column: :project_id, on_delete: :cascade
  end
end

