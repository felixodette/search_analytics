Rails.application.routes.draw do
  # add routes
resources :searches, only: [:create, :index]
end
