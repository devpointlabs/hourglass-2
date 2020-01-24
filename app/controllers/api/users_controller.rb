class Api::UsersController < ApplicationController

	def index
		object = User.search(params[:search], params[:current])
		render json: object
	end

	def update

		file = params[:image]
    
		if file
			begin
				ext = File.extname(file.tempfile)
				cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true)
				user.image = cloud_image['secure_url']
			rescue => e
				render json: { errors: e }, status: 422
			end
		end

		if current_user.update(user_params)
		
			render json: current_user
		else
			render json: current_user.errors, status: 422
		end
	end

	private

	def user_params
		params.require(:user).permit(:first_name, :last_name, :bio, :email, :phone, :image)
	end
	
end
