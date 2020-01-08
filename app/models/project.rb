class Project < ApplicationRecord
	has_many :tasks
	
	def self.get_admins
		arr = []
		self.project_admins.each do |a|
			arr.push(User.find(d))
		end
		arr
	end
end
