class ChangeProjectAdminOnProject < ActiveRecord::Migration[6.0]
	def change
		remove_column :projects, :project_admin
		add_column :projects, :project_admins, :integer, array: true, default: [], null: false
  end
end
