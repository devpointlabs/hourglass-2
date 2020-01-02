class CreateSessions < ActiveRecord::Migration[6.0]
  def change
    create_table :sessions do |t|
      t.datetime :start_time
      t.datetime :end_time
      t.text :note
      t.belongs_to :user, foreign_key: true
      t.belongs_to :task, foreign_key: true

      t.timestamps
    end
  end
end
