class Api::UsersController < ApplicationController

	def index
		render json: User.search(params[:search])
	end

	private
	
end
