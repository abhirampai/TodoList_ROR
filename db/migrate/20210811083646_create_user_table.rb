# frozen_string_literal: true

class CreateUserTable < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :name, null: false

      t.timestamps
    end
  end
end

