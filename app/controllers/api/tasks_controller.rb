class Api::TasksController < ApplicationController
	
	def index
		render json: @project.tasks
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
			params.require(:task).permit(:title, :description,:complete,:billable,:price_per_hour,:project_id)
		end
		def set_task
			@task = Task.find(params[:id])
		end
		def set_project
			@project = Project.find(params[:project_id])
		end
end
