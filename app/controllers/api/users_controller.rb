class Api::UsersController < ApplicationController

	def index
		object = User.search(params[:search], params[:current])
		render json: object
	end

	private
	
end
