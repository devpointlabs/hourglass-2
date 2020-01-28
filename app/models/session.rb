class Session < ApplicationRecord
  belongs_to :user
	belongs_to :task
	
	def task_name
		self.task.title
	end

	def project_name
		self.task.project.title
	end

end
