class Task < ApplicationRecord
  belongs_to :project
  has_many :sessions
  has_many :users, through: :sessions
end
