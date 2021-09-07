# frozen_string_literal: true

require "sidekiq/web"
require "sidekiq/cron/web"

Rails.application.routes.draw do

  def draw(routes_name)
    instance_eval(File.read(Rails.root.join("config/routes/#{routes_name}.rb")))
  end

  draw :sidekiq

  defaults format: :json do
    resources :tasks, except: %i[new edit], param: :slug
    resources :users, only: %i[create index]
    resource :sessions, only: %i[create destroy]
    resources :preferences, only: %i[show update]
    resources :comments, only: :create
    resources :projects, only: %i[index show], param: :project_name
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end

