class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :description
      t.boolean :complete
      t.boolean :billable
      t.float :price_per_hour
      t.belongs_to :project, foreign_key: true

      t.timestamps
    end
  end
end
