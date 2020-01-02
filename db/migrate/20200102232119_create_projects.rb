class CreateProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :projects do |t|
      t.string :title
      t.text :description
      t.string :client_name
      t.date :planned_start
      t.date :planned_end
      t.float :budget
      t.boolean :complete
      t.string :project_admin

      t.timestamps
    end
  end
end
