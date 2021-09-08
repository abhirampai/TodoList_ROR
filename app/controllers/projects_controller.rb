# frozen_string_literal: true

class ProjectsController < ApplicationController
  def index
    projects = Project.all.as_json(only: %i[id project_name])
    render status: :ok, json: { projects: projects }
  end

  def show
    project_id = Project.find_by_project_name!(params[:project_name])
    @pending_tasks = Task.where(project_id: project_id).inorder_of(:pending).as_json(
      include: {
        user: {
          only: %i[name
          id]
        }
      })
    @completed_tasks = Task.where(project_id: project_id).inorder_of(:completed)
  end
end

