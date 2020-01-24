class Api::UserTasksController < ApplicationController
	before_action :authenticate_user!

	def index
		tasks = []
		current_user.get_projects.each do |p|
			tasks.push({project: p.title, tasks: p.tasks});
		end
		render json: tasks
	end
	
end
