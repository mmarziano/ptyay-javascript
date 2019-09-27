Rails.application.routes.draw do
  

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root :to => 'sessions#new'
  
  get '/login' => "sessions#new"
  post '/login' => "sessions#create"
  get '/logout' => "sessions#destroy"
  get '/signup' => "users#new"
  post '/signup' => "users#create"
  post '/profile' => "users#complete_update"
  patch '/complete_profile' => "users#complete_profile"
  post '/fundraisers/:fundraiser_id/comments/new' => "comments#create"
  post '/households/:household_id/students/new' => "students#create"
  get '/fundraisers/exceeded_expectations' => "fundraisers#ee"
  get '/fundraisers/most_comments' => "fundraisers#most_comments"
  post '/students', to: "students#create"
  get '/student_list', to: "students#student_list"

  
  resources :users
  resources :fundraisers do
    resources :reservations, only: [:new, :edit]
    resources :comments, only: [:new, :create, :edit, :update, :destroy]
  end 

  resources :comments, only: :index
  resources :reservations
  resources :schools
  resources :households do 
    resources :students, only: [:new, :create]
  end 
  resources :students
  resources :classrooms, only: [:index, :new, :create]
  

  get '/auth/google_oauth2/callback' => 'sessions#omniauth'

end