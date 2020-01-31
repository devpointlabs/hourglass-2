class Api::TasksController < ApplicationController
	before_action :set_task, only: [:destroy, :update, :show]
	before_action :set_project, only: [:index, :create]
	
	def index
		render json: @project.tasks
	end
	
	def show
		render json: {project: Project.find(@task.project_id).title, task: @task.title, id: @task.id}
	end

	def create
		task = @project.tasks.new(task_params)
		if task.save
			render json: task
		else
			render json: task.errors, status: 422
		end
  end

	def update
		if @task.update(task_params)
			render json: @task
		else
			render json: @task.errors, status: 422
		end
  end

	def destroy
		@task.destroy
	end
	
	private
		def task_params
			params.require(:task).permit(:title, :description,:complete,:billable,:price_per_hour)
		end
		def set_task
			@task = Task.find(params[:id])
		end
		def set_project
			@project = Project.find(params[:project_id])
		end
end
