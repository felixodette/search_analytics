Rails.application.routes.draw do
  root 'pages#home'
  # add routes
resources :searches, only: [:create, :index]
end
