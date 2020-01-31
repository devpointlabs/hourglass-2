class ChangeColumnOnSession < ActiveRecord::Migration[6.0]
	def change
		change_column :sessions, :start_time, :datetime, null: false
		remove_column :sessions, :end_time
  end
end
