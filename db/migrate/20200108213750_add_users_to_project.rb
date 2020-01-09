class AddUsersToProject < ActiveRecord::Migration[6.0]
  def change
		add_column :projects, :all_users, :integer, array: true, default: [], null: false
		add_column :users, :projects, :integer, array: true, default: []
  end
end
