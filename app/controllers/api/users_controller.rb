class Api::UsersController < ApplicationController

	def index
		object = User.search(params[:search], params[:current])
		render json: object
	end

	def update
		user = User.find(params[:id])
		user.first_name = params[:first_name] ? params[:first_name] : user.first_name
		user.last_name = params[:last_name] ? params[:last_name] : user.last_name
		user.email = params[:email] ? params[:email] : user.email
		user.bio = params[:bio] ? params[:bio] : user.bio
		user.phone = params[:phone] ? params[:phone] : user.phone

		file = params[:image]
		
			if file
				begin
					ext = File.extname(file.tempfile)
					cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true)
					user.image = cloud_image['secure_url']
				# rescue => e
				# 	render json: { errors: e }, status: 422
				end
			end
		if user.save
		
			render json: user
		else
			render json: user.errors, status: 422
		end
	end

	private

	def user_params
		params.require(:user).permit(:first_name, :last_name, :bio, :email, :phone, :image)
	end
	
end
