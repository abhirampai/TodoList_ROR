# frozen_string_literal: true

class AddSlugToTask < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :slug, :varchar
  end
end

