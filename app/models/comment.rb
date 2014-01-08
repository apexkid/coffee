class Comment < ActiveRecord::Base
	validates :content, :presence => true
	
	attr_accessible :content, :nickname
	belongs_to :post
end
