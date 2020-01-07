class AddSpentAndCostToProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :projects, :spent, :float
    add_column :projects, :cost, :float
  end
end
