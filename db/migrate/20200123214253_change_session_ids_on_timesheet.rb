class ChangeSessionIdsOnTimesheet < ActiveRecord::Migration[6.0]
	def change
		remove_column :timesheets, :session_ids
  end
end
