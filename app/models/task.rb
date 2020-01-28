class Task < ApplicationRecord
  belongs_to :project
  has_many :sessions, dependent: :destroy
  has_many :users, through: :sessions
end
