Rails.application.routes.draw do
	mount_devise_token_auth_for 'User', at: 'api/auth'
	namespace :api do
		resources :users, only: [:index]
		resources :projects, except: [:new] do
			resources :project_admins, only: :index
			resources :tasks, except: [:new] do
			end
		end
		resources :project_admins, only: :update
		resources :project_users, only: [:index, :update]
		resources :sessions, except: [:new]
		resources :timesheets, except: [:new]
	end
end
