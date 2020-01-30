class Api::ProjectsController < ApplicationController
	before_action :authenticate_user!
	before_action :set_project, only: [:show, :update, :destroy]

	def index
		render json: current_user.get_projects
		# render json: Project.all
  end

	def show
		render json: @project
  end

	def create
		project = Project.new(project_params)
		if project.save
			current_user.add_project project.id
			render json: project
		else
			render json: project.errors, status: 422
		end
  end

	def update
		if @project.update(project_params)
			render json: @project.id
		else
			render json: @project.errors, status: 422
		end
  end

	def destroy
		if 
		# @project.project_admins.include?(current_user.id)
			current_user.remove_project(@project.id)
			@project.destroy
			render json: current_user.get_projects
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
