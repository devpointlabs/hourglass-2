class Project < ApplicationRecord
	has_many :tasks, dependent: :destroy
	
	def self.get_admins
		arr = []
		self.project_admins.each do |a|
			arr.push(User.find(a))
		end
		arr
	end

	def self.get_users
		arr = []
		self.all_users.each do |u|
			arr.push(User.find(u))
		end
		arr
	end

end
