Rails.application.routes.draw do
	mount_devise_token_auth_for 'User', at: 'api/auth'
	namespace :api do
		resources :users, only: [:index]
		resources :projects, except: [:new] do
			resources :tasks, except: [:new] do
			end
		end
		resources :sessions, except: [:new]
	end
end
