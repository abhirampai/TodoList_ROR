# frozen_string_literal: true

class AddProgressAndStatus < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :progess, :varchar, default: "pending"
    add_column :tasks, :status, :varchar, default: "unstarred"
  end
end

