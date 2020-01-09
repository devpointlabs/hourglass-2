class Api::ProjectUsersController < ApplicationController
	before_action :authenticate_user!
	before_action :set_project

	def index
		render json: @project.get_users
  end

	def update
		if @project.update(users_params)
			render json: @project.all_users
		else
			render json: @project.errors, status: 422
		end
	end
	
	private
		def set_project
			@project = Project.find(params[:id])
		end

		def users_params
			params.require(:project).permit(:all_users)
		end

end
