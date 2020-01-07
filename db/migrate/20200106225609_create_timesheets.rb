class CreateTimesheets < ActiveRecord::Migration[6.0]
  def change
    create_table :timesheets do |t|
      t.datetime :start_date
      t.belongs_to :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
