class AddCountryToPosts < ActiveRecord::Migration
  def self.up
    add_column :posts, :country, :string
  end

  def self.down
    remove_column :posts, :country
  end
end
