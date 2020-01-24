class Api::UsersController < ApplicationController

	def index
		object = User.search(params[:search], params[:current])
		render json: object
	end

	def update
		if current_user.update(user_params)
			render json: current_user
		else
			render json: current_user.errors, status: 422
		end
	end

	private

	def user_params
		params.require(:user).permit(:first_name, :last_name, :email, :phone)
	end
	
end
