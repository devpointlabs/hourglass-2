
class Array

	def clean

		arr = []

		self.each do |a|

			unless arr.include?(a)
				arr.push(a)
			end
		end
		arr
	end
end