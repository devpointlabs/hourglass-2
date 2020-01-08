class Api::ProjectAdminsController < ApplicationController
	before_action :authenticate_user!
	before_action :set_project

	def index
		render json: @project.get_admins
  end

	def update
		if @project.update(admin_params)
			render json: @project
		else
			render json: @project.errors, status: 422
		end
	end
	
	private
		def set_project
			@project = Project.find(params[:id])
		end

		def admin_params
			params.require(:project).permit(:project_admins)
		end

end
