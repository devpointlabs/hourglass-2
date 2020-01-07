class AddTotalToSessions < ActiveRecord::Migration[6.0]
  def change
    add_column :sessions, :total_minutes, :integer, default: 0
  end
end
