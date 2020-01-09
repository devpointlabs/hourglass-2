class Api::UsersController < ApplicationController

	def index
		render json: User.find_by(user_params)
	end

	private
		
	
end
