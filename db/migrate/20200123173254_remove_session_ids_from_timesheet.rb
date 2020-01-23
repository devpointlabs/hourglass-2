class RemoveSessionIdsFromTimesheet < ActiveRecord::Migration[6.0]
	def change
		change_column :timesheets, :session_ids, :string, array: true, default: []
  end
end
