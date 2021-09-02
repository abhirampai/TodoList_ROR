# frozen_string_literal: true

class ProjectsController < ApplicationController
  def index
    projects = Project.all.as_json(only: %i[id project_name])
    render status: :ok, json: { projects: projects }
  end
end

