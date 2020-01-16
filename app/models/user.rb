class User < ApplicationRecord
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable
  include DeviseTokenAuth::Concerns::User
  has_many :sessions
	has_many :tasks, through: :sessions
	
	def get_projects
		arr = []
		self.projects.each do |p|
			arr.push(Project.find(p))
		end
		arr
	end

	def add_project id
		self.update(projects: self.projects.push(id))
	end

	def self.search str, currents
		if str != nil &&  !str.empty?
			str = str.downcase
			if currents
				return User.find_by_sql([%(
					SELECT * 
					FROM users AS u
					WHERE u.id NOT IN (?) AND (LOWER(u.first_name) 
					LIKE '%#{str}%' OR LOWER(u.last_name) 
					LIKE '%#{str}%' OR LOWER(u.nickname) 
					LIKE '%#{str}%')),currents])
			else
				return User.find_by_sql(%(
					SELECT * 
					FROM users AS u
					WHERE LOWER(u.first_name) 
					LIKE '%#{str}%' OR LOWER(u.last_name) 
					LIKE '%#{str}%' OR LOWER(u.nickname) 
					LIKE '%#{str}%'))
			end
		end
	end

end
