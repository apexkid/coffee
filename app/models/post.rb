class Post < ActiveRecord::Base
   validates :title, :presence => true
   validates :body, :presence => true
   validates :country, :presence => true

   has_many :comments, :dependent => :destroy
end
