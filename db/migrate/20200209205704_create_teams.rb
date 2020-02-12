class CreateTeams < ActiveRecord::Migration[6.0]
  def change
    create_table :teams do |t|
      t.string :name, null: false
      t.string :company
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
