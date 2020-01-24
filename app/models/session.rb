class Session < ApplicationRecord
  belongs_to :user
	belongs_to :task
	
	def task_name
		self.task.title
	end

end
