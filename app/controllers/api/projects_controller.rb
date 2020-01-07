class Api::ProjectsController < ApplicationController
	before_action :set_project, only: [:show, :update, :destroy]

	def index
		render json: Projects.all
  end

	def show
		render json: @project
  end

	def create
		project = Project.new(project_params)
		if project.save
			render json: project
		else
			render json: project.errors, status: 422
		end
  end

	def update
		if @project.update(project_params)
			render json: @project
		else
			render json: @project.errors, status: 422
		end
  end

	def destroy
		if @project.project_admins.includes(current_user.id)
			@project.destroy
		else
			render status: 401
		end
	end
	
	private 
		def set_project
			@project = Project.find(params[:id])
		end
		def project_params
			params.require(:project).permit(
				:title,
				:description,
				:client_name,
				:planned_start,
				:planned_end,
				:budget,
				:complete,
				:project_admins,
				:cost,
				:spent)
		end
end
