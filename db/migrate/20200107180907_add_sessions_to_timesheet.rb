class AddSessionsToTimesheet < ActiveRecord::Migration[6.0]
  def change
    add_column :timesheets, :session_ids, :integer, array: true, default: []
  end
end
