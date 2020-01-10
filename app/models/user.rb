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
end
